import React from 'react';
// import { Home } from '../components/Test/Home'
// import { List } from '../components/Test/testTable'
import Geolocation from '../components/Pages/Options/geolocation'
import { shallow } from 'enzyme'

// describe('>>>H O M E --- Shallow Render REACT COMPONENTS', () => {
//     let wrapper
//     const output = 10

//     beforeEach(() => {
//         wrapper = shallow(
//             <Home output={output} />
//         )
//     })

//     it('+++ render the DUMB component', () => {
//         expect(wrapper.length).toEqual(1)
//     });

//     it('+++ contains output', () => {
//         expect(wrapper.find('input[placeholder="Output"]').prop('value')).toEqual(output)
//     });

// });

// describe('List', () => {
//     let list;

//     beforeEach(() => {
//         list = shallow(<List data={['Name 1', 'Name 2', 'Name 3']} />);
//     });

//     it('List renders table', () => {
//         expect(list.find('section').length).toEqual(1);
//     });

//     it('Class of rendered table', () => {
//         expect(list.find('.myClass').length).toEqual(1);
//     });

// });

describe('About', () => {
    let list;
    beforeEach(() => {
        list = shallow(<Geolocation />);
    });

    it('List renders table', () => {
        expect(list.find('section').length).toEqual(2);
    });
});