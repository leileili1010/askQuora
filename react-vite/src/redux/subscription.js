const DELETE_SUBSCRIPTION = "subscriptions/DELETE_SUBSCRIPTION";

const deleteSubscription = (subscriptionId) => ({
    type: DELETE_SUBSCRIPTION,
    subscriptionId
  })
  

export const thunkDeleteSubscription = (subscriptionId) => async (dispatch) => {
    const res = await fetch(`/api/subscriptions/${subscriptionId}/delete`, {
        method: 'DELETE',
    })

    if(res.ok) {
        dispatch(deleteSubscription(subscriptionId));
        return subscriptionId;
    } else {
        const errs = await res.json();
        return errs;
    }
}


