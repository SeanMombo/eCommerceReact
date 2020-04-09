import React from 'react';
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component'

import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionOverview);

class ShopPage extends React.Component {
    state = {
        loading: true
    }
    
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        const CollectionRef = firestore.collection('collections');
        CollectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log(collectionsMap)
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        })
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading={loading} {...props}/>}/>
            </div>
        )
    }
}
    
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})
export default connect(null, mapDispatchToProps)(ShopPage);