'use strict';

(function() {
    if (!Polymer || !Polymer.Base) {
        console.warn('Polymer is not loaded yet. polymer-global-variables cant be used.');
        return;
    }

    if (Polymer.globalsManager) {
        console.warn('Polymer.globalsManager already defined.');
        return;
    }

    var __configureProperties = Polymer.Base._configureProperties;

    Polymer.globalsManager = {
        globals: {},
        elementsInstances: {'*': []},

        set: function(key, value) {
            this.globals[key] = value;

            if (Array.isArray(this.elementsInstances[key])) {
                // Iterate through every element that subscribed to this property
                // and use 'set' to notify changes in all of them
                for (var i in this.elementsInstances[key]) {
                    if (this.elementsInstances[key][i]) {
                        this.elementsInstances[key][i].set('globals.' + key, value);
                    }
                }
            }
            // Iterate through every element that subscribed to all properties
            // and use 'set' to notify changes in all of them
            for (var i in this.elementsInstances['*']) {
                if (this.elementsInstances[key][i]) {
                    this.elementsInstances[key][i].set('globals.' + key, value);
                }
            }

            return this.globals;
        }
    };

    Polymer.Base._addFeature({
        // Replace _configureProperties method to load elements properties with globals property
        _configureProperties: function(properties, config) {
            if (properties && typeof this.globalsProperties !== 'undefined') {
                // This element will get notified when one of the global properties it specified change
                if (Array.isArray(this.globalsProperties)) {
                    this.globalsProperties.forEach(function (property) {
                        if (!Polymer.globalsManager.elementsInstances[property]) {
                            Polymer.globalsManager.elementsInstances[property] = []
                        }
                        var instances = Polymer.globalsManager.elementsInstances[property];

                        // Prevent duplicate instances
                        if (instances.indexOf(this) < 0) {
                            instances.push(this);
                        }
                    }, this);
                } else {
                    // This element subscribed to all
                    var instances = Polymer.globalsManager.elementsInstances['*'];

                    // Prevent duplicate instances
                    if (instances.indexOf(this) < 0) {
                        instances.push(this);
                    }
                }

                // Add globals property to every instance
                if (properties) {
                    properties.globals = {
                        type: Object,
                        value: Polymer.globalsManager.globals
                    };
                }
            }

            // Continue using the original _configureProperties method
            __configureProperties.apply(this, [properties, config]);
        }
    });

})();
