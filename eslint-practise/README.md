# eslint-plugin-eslint-test

eslint-test

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-eslint-test`:

```
$ npm install eslint-plugin-eslint-test --save-dev
```


## Usage

Add `eslint-test` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-test"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "eslint-test/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





