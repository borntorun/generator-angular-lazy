var _ = require('lodash');
var s = require('underscore.string');

_.mixin(s.exports());

module.exports = {
    determineParentComponent: function(stateName) {
        stateName = this.normalizeStateName(stateName);

        if(stateName.indexOf('.') === -1) {
            return 'application';
        }

        return this.stateToComponentName(
            stateName.slice(0, stateName.lastIndexOf('.'))
        );
    },

    normalizeStateName: function(stateName) {
        if(stateName.indexOf('app.') === 0) {
            stateName = stateName.slice(4);
        }

        return stateName
            .split('.')
            .map(function(part) {
                return _.slugify(_.humanize(part))
            })
            .join('.');
    },

    normalizeUrl: function(stateName, url) {
        var leadingSlashRequired = stateName.indexOf('.') > -1;
        var hasLeadingSlash = url[0] === '/';

        if(leadingSlashRequired && !hasLeadingSlash) {
            url = '/' + url;
        } else if(!leadingSlashRequired && hasLeadingSlash) {
            url = url.slice(1);
        }

        if(url.slice(-1) === '/') {
            url = url.slice(0, -1);
        }

        return url;
    },

    stateToComponentName: function(stateName) {
        return stateName.replace(/\./g, '-') + '-state';
    }
}
