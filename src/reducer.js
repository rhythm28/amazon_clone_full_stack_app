import { KeyboardReturnTwoTone } from "@mui/icons-material"

export const initialState = {
    basket: [],
    user: null,
}

export const getBasketTotal = (basket) =>
    basket.reduce((amount,item) => item.price + amount, 0)

const reducer = (state, action) => {
    console.log(action)
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            }
        case 'REMOVE_FROM_BASKET':
            //console.log('this is the action id ' + action.title)
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
              );
              let newBasket = [...state.basket];
              //console.log( "this is the index of the item " + index)
              if (index >= 0) {
                newBasket.splice(index, 1);
        
              } else {
                console.warn(
                  `Cant remove product (id: ${action.id}) as it's not in basket!`
                )
              }
              return {
                ...state,
                basket: newBasket
              }
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case 'EMPTY_BASKET':
          return {
            ...state,
            basket: []
          }
        default:
            return state
    }
}

export default reducer