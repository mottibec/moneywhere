import React from 'react';
import Carousel from 'react-native-snap-carousel';
import UserCard from './UserCard';

export default class UserCarousel extends React.Component {
    _renderItem({ item, index }) {
        return <UserCard user={item}> </UserCard>
    }

    render() {
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.props.users}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
            />
        );
    }
}