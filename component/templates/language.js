function <%= _.camelize(_.slugify(locale, true)) %>($translateProvider) {
    $translateProvider.translations('<%= locale %>', {
        '<%= tagName %>-component.foo': 'bar'
    });
}

export default [
    '$translateProvider',
    <%= _.camelize(_.slugify(locale, true)) %>
];
