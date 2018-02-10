if (typeof window !== 'undefined')
    require('formdata-polyfill');

const Spyo = require('spyo');
const extend = require('defaulty');

/**
 * @class
 */
class SpyForm {

    constructor(el, opts = {}) {

        this.data = {};

        this._isDifferent = false;

        this.opts = extend.copy(opts, {
            exclude: []
        });

        if (typeof el === 'string') {
            this.data = SpyForm.getFormData(el);
            this.opts.refreshHandler = () => {
                return SpyForm.getFormData(el);
            }
        } else if (typeof el === 'object') {
            this.data = el;
        }

        this.spyo = new Spyo(this.data, this.opts);

        this.spyo.onChange(different => {
            this._isDifferent = different;
        });
    }

    /**
     * Check if form data is different to original data
     * @returns {boolean}
     */
    isDifferent() {
        return this._isDifferent;
    }

    /**
     * Extract form data
     * @param el {string} query selector
     * @returns {{}}
     */
    static getFormData(el) {
        let data = {};
        let form = document.querySelector(el);

        if (!Boolean(form)) {
            throw new Error('Form element is required');
        }

        let formData = new FormData(form);

        for (let record of formData) {
            data[record[0]] = record[1];
        }

        return data;
    }
}

module.exports = SpyForm;