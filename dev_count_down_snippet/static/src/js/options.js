odoo.define('dev_count_down_snippet.dev_s_countdown_options', function (require) {
'use strict';

const core = require('web.core');
const options = require('web_editor.snippets.options');
const CountdownWidget = require('dev_count_down_snippet.s_countdown_1');

const qweb = core.qweb;

options.registry.countdown_1 = options.Class.extend({
    events: _.extend({}, options.Class.prototype.events || {}, {
        'click .toggle-edit-message': '_onToggleEndMessageClick',
    }),

    endAction: function (previewMode, widgetValue, params) {
        this.$target[0].dataset.endAction = widgetValue;
        if (widgetValue === 'message') {
            if (!this.$target.find('.s_countdown_end_message').length) {
                const message = this.endMessage || qweb.render('dev_count_down_snippet.s_countdown.end_message');
                this.$target.append(message);
            }
        } else {
            const $message = this.$target.find('.s_countdown_end_message').detach();
            if ($message.length) {
                this.endMessage = $message[0].outerHTML;
            }
        }
    },
    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * @override
     */
    updateUIVisibility: async function () {
        await this._super(...arguments);
        const dataset = this.$target[0].dataset;

        // End Action UI
        this.$el.find('.toggle-edit-message')
            .toggleClass('d-none', dataset.endAction !== 'message');

        // End Message UI
        this.updateUIEndMessage();
    },
    /**
     * @see this.updateUI
     */
    updateUIEndMessage: function () {
        this.$target.find('.count-down-container')
            .toggleClass("d-none", this.showEndMessage === true && this.$target.hasClass("hide-countdown"));
        this.$target.find('.s_countdown_end_message')
            .toggleClass("d-none", !this.showEndMessage);
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @override
     */
    _computeWidgetState: function (methodName, params) {
        switch (methodName) {
            case 'endAction':
            case 'layout':
                return this.$target[0].dataset[methodName];

            case 'selectDataAttribute': {
                if (params.colorNames) {
                    // In this case, it is a colorpicker controlling a data
                    // value on the countdown: the default value is determined
                    // by the countdown public widget.
                    params.attributeDefaultValue = CountdownWidget.prototype.defaultColor;
                }
                break;
            }
        }
        return this._super(...arguments);
    },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    _onToggleEndMessageClick: function () {
        this.showEndMessage = !this.showEndMessage;
        this.$el.find(".toggle-edit-message")
            .toggleClass('text-primary', this.showEndMessage);
        this.updateUIEndMessage();
        this.trigger_up('cover_update');
    },
});
});
