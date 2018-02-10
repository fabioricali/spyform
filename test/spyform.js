const SpyForm = require('../');

function getInput(name) {
    return document.querySelector('input[name=' + name + ']')
}

describe('SpyForm', function () {

    this.timeout(5000);

    before(function () {
        this.jsdom = require('jsdom-global')();
    });

    after(function () {
        this.jsdom();
    });

    it('should be return ok', function (done) {
        document.body.innerHTML = `
        <form>
            <input type="text" name="firstName" value="Mike"/>
            <input type="text" name="lastName" value="Red"/>
            <input type="text" value="without name"/>
            <textarea name="notes">this a note</textarea>
            <input type="button" value="a button"/>
        </form>
        `;

        new SpyForm('form');

        getInput('firstName').value = 'John';
        setTimeout(()=>{
            getInput('firstName').value = 'Mike';
        }, 200);
    });
});