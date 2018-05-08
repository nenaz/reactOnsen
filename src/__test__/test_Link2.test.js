import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Link2 from '../test_component/Link2';
/* global window */

describe('Link2', () => {
    it('should handle the click event', () => {
        window.alert = jest.fn();
        const output = shallow(
            <Link2 title="mockTitle" url="mockUrl" />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
        output.simulate('click');
        expect(window.alert).toHaveBeenCalledWith('Кликнули по ссылке!');
    });

    it('should handle state changes', () => {
        window.alert = jest.fn();
        const output = shallow(
            <Link2 title="mockTitle" url="mockUrl" />
        );
        // expect(shallowToJson(output)).toMatchSnapshot();
        expect(output.state().clicked).toEqual(false);
        output.simulate('click');
        expect(output.state().clicked).toEqual(true);
    });
});