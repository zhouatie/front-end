/**
 * @fileoverview no-widow
 * @author zhou
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-window"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const code = `
export default {
    asyncData() {
        console.log(window)
    }
}
`
var ruleTester = new RuleTester();
ruleTester.run("no-window", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code,
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
