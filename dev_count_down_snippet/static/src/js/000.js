odoo.define('dev_count_down_snippet.s_countdown_1', function (require) {
'use strict';

const {ColorpickerWidget} = require('web.Colorpicker');
const core = require('web.core');
const publicWidget = require('web.public.widget');
const weUtils = require('web_editor.utils');

const qweb = core.qweb;
const _t = core._t;

const CountdownWidget_1 = publicWidget.Widget.extend({
    selector: '.dev_s_countdown',
    xmlDependencies: ['/dev_count_down_snippet/static/src/xml/000.xml'],
    disabledInEditableMode: false,
    defaultColor: 'rgba(0, 0, 0, 255)',

    /**
     * @override
     */
    start: function () {
        this.$wrapper = this.$('.count-down-container');
        this.hereBeforeTimerEnds = false;
        this.endAction = this.el.dataset.endAction;
        this.endTime = parseInt(this.el.dataset.endTime);
        this.size = parseInt(this.el.dataset.size);
        this.display = this.el.dataset.display;

        this.layout = this.el.dataset.layout;
        this.layoutBackground = this.el.dataset.layoutBackground;
        this.progressBarStyle = this.el.dataset.progressBarStyle;
        this.progressBarWeight = this.el.dataset.progressBarWeight;

        this.onlyOneUnit = this.display === 'd';
        this.width = parseInt(this.size);
        if (this.layout === 'boxes') {
            this.width /= 1.75;
        }
        this._initTimeDiff();

        this._render();

        this.setInterval = setInterval(this._render.bind(this), 1000);
        return this._super(...arguments);
    },
    /**
     * @override
     */
    destroy: function () {
        this.$('.s_countdown_end_redirect_message').remove();
        this.$('canvas').remove();
        this.$('.s_countdown_end_message').addClass('d-none');
        this.$('.s_countdown_text_wrapper').remove();
        this.$('.s_countdown_canvas_wrapper').removeClass('d-none');

        clearInterval(this.setInterval);
        this._super(...arguments);
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------
    /**
     * Gets the time difference in seconds between now and countdown due date.
     *
     * @private
     */
    _getDelta: function () {
        const currentTimestamp = Date.now() / 1000;
        return this.endTime - currentTimestamp;
    },
    /**
     * Handles the action that should be executed once the countdown ends.
     *
     * @private
     */
    _handleEndCountdownAction: function () {
        if (this.endAction === 'redirect') {
            const redirectUrl = this.el.dataset.redirectUrl || '/';
            if (this.hereBeforeTimerEnds) {
                // Wait a bit, if the landing page has the same publish date
                setTimeout(() => window.location = redirectUrl, 500);
            } else {
                // Show (non editable) msg when user lands on already finished countdown
                if (!this.$('.s_countdown_end_redirect_message').length) {
                    const $container = this.$('> .container, > .container-fluid, > .o_container_small');
                    $container.append(
                        $(qweb.render('website.s_countdown.end_redirect_message', {
                            redirectUrl: redirectUrl,
                        }))
                    );
                }
            }
        } else if (this.endAction === 'message') {
            this.$('.s_countdown_end_message').removeClass('d-none');
        }
    },
    /**
     * Initializes the `diff` object. It will contains every visible time unit
     * which will each contain its related canvas, total step, label..
     *
     * @private
     */
    _initTimeDiff: function () {
        const delta = this._getDelta();
        this.diff = [];
        if (this._isUnitVisible('d') && !(this.onlyOneUnit && delta < 86400)) {
            this.diff.push({
                total: 15,
                label: _t("Days"),
                nbSeconds: 86400,
            });
        }
        if (this._isUnitVisible('h') || (this.onlyOneUnit && delta < 86400 && delta > 3600)) {
            this.diff.push({
                total: 24,
                label: _t("Hours"),
                nbSeconds: 3600,
            });
        }
        if (this._isUnitVisible('m') || (this.onlyOneUnit && delta < 3600 && delta > 60)) {
            this.diff.push({
                total: 60,
                label: _t("Minutes"),
                nbSeconds: 60,
            });
        }
        if (this._isUnitVisible('s') || (this.onlyOneUnit && delta < 60)) {
            this.diff.push({
                total: 60,
                label: _t("Seconds"),
                nbSeconds: 1,
            });
        }
    },
    /**
     * Returns weither or not the countdown should be displayed for the given
     * unit (days, sec..).
     *
     * @private
     * @param {string} unit - either 'd', 'm', 'h', or 's'
     * @returns {boolean}
     */
    _isUnitVisible: function (unit) {
        return this.display.includes(unit);
    },
    /**
     * Draws the whole countdown, including one countdown for each time unit.
     *
     * @private
     */
    _render: function () {
        // If only one unit mode, restart widget on unit change to populate diff
        if (this.onlyOneUnit && this._getDelta() < this.diff[0].nbSeconds) {
            this._initTimeDiff();
        }
        this._updateTimeDiff();

        const hideCountdown = this.isFinished && !this.editableMode && this.$el.hasClass('hide-countdown');
        if (this.layout === 'text') {
            this.$('.count-down-container').addClass('d-none');
            if (!this.$textWrapper) {
                this.$textWrapper = $('<span/>').attr({
                    class: 's_countdown_text_wrapper d-none',
                });
                this.$textWrapper.text(_t("Countdown ends in"));
                this.$textWrapper.append($('<span/>').attr({
                    class: 's_countdown_text ml-1',
                }));
                this.$textWrapper.appendTo(this.$wrapper);
            }

            this.$textWrapper.toggleClass('d-none', hideCountdown);

            const countdownText = this.diff.map(e => e.nb + ' ' + e.label).join(', ');
            this.$('.s_countdown_text').text(countdownText.toLowerCase());
        } else {
            for (const val of this.diff) {
            	$('.count-down-container').toggleClass('d-none', hideCountdown);
                if (hideCountdown) {
                    continue;
                }
            	if(val.label == 'Seconds'){
            		$('.s-1-count-seconds').text(val.nb)
            	}
            	if(val.label == 'Minutes'){
            		$('.s-1-count-minutes').text(val.nb)
            	}
            	if(val.label == 'Hours'){
            		$('.s-1-count-hours').text(val.nb)
            	}
            	if(val.label == 'Days'){
            		$('.s-1-count-days').text(val.nb)
            	}
            }
        }

        if (this.isFinished) {
            clearInterval(this.setInterval);
            if (!this.editableMode) {
                this._handleEndCountdownAction();
            }
        }
    },
    /**
     * Updates the remaining units into the `diff` object.
     *
     * @private
     */
    _updateTimeDiff: function () {
        let delta = this._getDelta();
        this.isFinished = delta < 0;
        if (this.isFinished) {
            for (const unitData of this.diff) {
                  unitData.nb = 0;
            }
            return;
        }

        this.hereBeforeTimerEnds = true;
        for (const unitData of this.diff) {
              unitData.nb = Math.floor(delta / unitData.nbSeconds);
              delta -= unitData.nb * unitData.nbSeconds;
        }
    },
});

publicWidget.registry.countdown_1 = CountdownWidget_1;

return CountdownWidget_1;
});
