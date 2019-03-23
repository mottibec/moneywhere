import { Dimensions } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import UserCard from './UserCard';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 3;

export default class UserCarousel extends React.Component {
    _renderItem(item, index, onClickAction) {
        return (
            <UserCard
             user={item}
             onClickAction={onClickAction}  />
        );
    }

    render() {
        const { users, onClickAction, onSnapToItem} = this.props;
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={users}
                renderItem={({ item, index }) => this._renderItem(item, index, onClickAction)}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                onSnapToItem={onSnapToItem}
            />
        );
    }
}