# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2015 DevIntelle Consulting Service Pvt.Ltd (<http://www.devintellecs.com>).
#
#    For Module Support : devintelle@gmail.com  or Skype : devintelle
#
##############################################################################
{
    'name': 'Website Countdown Snippet, Website Countdown Timer for Odoo, Website Countdown Timer',
    'version': '16.0.1.0',
    'sequence': 1,
    'category': 'Website',
    'description':
        """
        Odoo application is a simple yet powerful app that allows you to add a countdown timer to your Odoo website. This can be used to promote upcoming events, sales, or product launches. The countdown timer is fully customizable, so you can change the colors, fonts, and text to match your branding.
        
        Website Countdown Timer for Odoo, Odoo Website Countdown Snippet, Website Countdown Timer
Odoo website countdown snippet
Odoo countdown timer
Add countdown to Odoo website
Website countdown timer for Odoo
Odoo website promotion with countdown
Countdown snippet for Odoo marketing
Countdown timer for Odoo sales
Countdown timer for Odoo events
Countdown timer for Odoo product launches
Odoo website marketing app
Odoo website promotion app
Odoo sales app
Odoo event app
Odoo product launch app
Odoo website timer
Odoo event timer
Odoo product launch timer
Odoo marketing timer
Odoo sales timer
Odoo countdown
Website countdown
Event countdown
Product launch countdown
Marketing countdown
Sales countdown
Odoo website snippet
Odoo event snippet
Odoo product launch snippet
Odoo marketing snippet
Odoo sales snippet
Countdown timer app
Website timer app
Event timer app
Product launch timer app
Marketing timer app
Sales timer app
Odoo app
Website app
Event app
Product launch app
Marketing app
Sales app
    """,
    'summary': 'Website Countdown Timer for Odoo, Odoo Website Countdown Snippet, Website Countdown Timer, Odoo website countdown snippet, Odoo countdown timer, Add countdown to Odoo website, Website countdown timer for Odoo, Odoo website promotion with countdown, Countdown snippet for Odoo marketing, Countdown timer for Odoo sales, Countdown timer for Odoo events, Countdown timer for Odoo product launches, Odoo website marketing app, Odoo website promotion app, Odoo sales app, Odoo event app, Odoo product launch app, Odoo website timer, Odoo event timer, Odoo product launch timer, Odoo marketing timer, Odoo sales timer, Odoo countdown, Website countdown, Event countdown, Product launch countdown, Marketing countdown, Sales countdown, Odoo website snippet, Odoo event snippet, Odoo product launch snippet, Odoo marketing snippet, Odoo sales snippet, Countdown timer app, Website timer app, Event timer app, Product launch timer app, Marketing timer app, Sales timer app, Odoo app, Website app, Event app, Product launch app, Marketing app, Sales app',
    
    'depends': ['website','web_editor'],
    'data': [
        'views/count_down_snippet.xml',
#        'views/assets.xml',
    ],
    'assets': {
        
        'web.assets_wysiwyg': [
            'dev_count_down_snippet/static/src/js/options.js',
        ],
        'web.assets_frontend': [
            'dev_count_down_snippet/static/src/js/000.js',
            'dev_count_down_snippet/static/src/css/count_down_snippet_1.css'
        ],
    },
    'demo': [],
    'test': [],
    'css': [],
    'qweb': [],
    'js': [],
    'images': ['images/main_screenshot.png'],
    'installable': True,
    'application': True,
    'auto_install': False,
    
    # author and support Details =============#
    'author': 'DevIntelle Consulting Service Pvt.Ltd',
    'website': 'http://www.devintellecs.com',    
    'maintainer': 'DevIntelle Consulting Service Pvt.Ltd', 
    'support': 'devintelle@gmail.com',
    'price':3.0,
    'currency':'EUR',
    #'live_test_url':'https://youtu.be/A5kEBboAh_k'
}
# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
