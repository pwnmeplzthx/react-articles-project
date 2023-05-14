import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('mainClass')).toBe('mainClass');
    });

    test('with additional classes', () => {
        const expected = 'mainClass addClass1 addClass2';
        expect(classNames('mainClass', ['addClass1', 'addClass2'])).toBe(expected);
    });

    test('with mods', () => {
        const expected = 'mainClass addClass1 addClass2 hovered scrollable';
        expect(classNames('mainClass', ['addClass1', 'addClass2'], { hovered: true, scrollable: true })).toBe(expected);
    });

    test('with mods false', () => {
        const expected = 'mainClass addClass1 addClass2 hovered';
        expect(classNames('mainClass', ['addClass1', 'addClass2'], { hovered: true, scrollable: false })).toBe(expected);
    });

    test('with mods undefined', () => {
        const expected = 'mainClass addClass1 addClass2 hovered';
        expect(classNames('mainClass', ['addClass1', 'addClass2'], { hovered: true, scrollable: undefined })).toBe(expected);
    });

    // TODO
    // test('with mods string', () => {
    //     const expected = 'mainClass addClass1 addClass2 hovered';
    //     expect(classNames('mainClass', ['addClass1', 'addClass2'], { hovered: true, scrollable: 'sjdfhjahja' })).toBe(expected);
    // });
});
