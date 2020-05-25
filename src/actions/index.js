import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () =>async (dispatch,getState) =>{
    console.log("about to")
    await dispatch(fetchPosts());

    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id=>{
    //     console.log({id})
    //     dispatch(fetchUser(id))
    // })


    // await doesnt work on for each
    //    await Promise.all( userIds.map(id=>dispatch(fetchUser(id))))

// chain calls next function with prev func results as first arg
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id=>dispatch(fetchUser(id)))
        .value();
}

export const fetchPosts = () => {
    return async(dispatch) => {
        const response = await jsonPlaceholder.get('/posts')
        dispatch({ type: 'FETCH_POSTS', payload: response.data })
    }
}

export const fetchUser = (id) =>async dispatch =>{

    const response = await jsonPlaceholder.get(`/users/${id}`)

    dispatch({type: 'FETCH_USER', payload: response.data})

}


// export const fetchUser = (id) =>  dispatch =>{
//     _fetchUser(id, dispatch);
// }
// const _fetchUser = _.memoize(async(id ,dispatch) =>{
//     const response = await jsonPlaceholder.get(`/users/${id}`)

//     dispatch({type: 'FETCH_USER', payload: response.data})
// });