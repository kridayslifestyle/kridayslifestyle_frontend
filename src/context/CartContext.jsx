"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

const CartContext = createContext(null);

// ─────────────────────────────────────────────
// ACTION TYPES
// ─────────────────────────────────────────────
const ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QTY: "UPDATE_QTY",
  CLEAR_CART: "CLEAR_CART",
  LOAD_FROM_STORAGE:
    "LOAD_FROM_STORAGE",

  APPLY_COUPON:
    "APPLY_COUPON",

  REMOVE_COUPON:
    "REMOVE_COUPON",
};

// ─────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────
const initialState = {
  items: [],

  loaded: false,

  coupon: null,
};

// ─────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────
function cartReducer(state, action) {

  switch (action.type) {

    // ── Load from localStorage ──
    case ACTIONS.LOAD_FROM_STORAGE:

      return {
        ...state,
        items: action.payload,
        loaded: true,
      };

    // ── Add item ──
    case ACTIONS.ADD_ITEM: {

      const incoming =
        action.payload;

      // Same product + same size
      const existingIndex =
        state.items.findIndex(
          (item) =>
            item.id === incoming.id &&
            item.size === incoming.size
        );

      // Already exists
      if (existingIndex >= 0) {

        const updated =
          [...state.items];

        updated[existingIndex] = {

          ...updated[
          existingIndex
          ],

          qty: Math.min(

            updated[
              existingIndex
            ].qty +

            (incoming.qty || 1),

            incoming.stockQuantity || 10

          ),

        };

        return {
          ...state,
          items: updated,
        };
      }

      // New item
      return {

        ...state,

        items: [
          ...state.items,

          {
            ...incoming,

            qty:
              incoming.qty || 1,
          },
        ],
      };
    }

    // ── Remove item ──
    case ACTIONS.REMOVE_ITEM:

      return {

        ...state,

        items:
          state.items.filter(
            (item) =>

              !(
                item.id ===
                action.payload.id &&

                item.size ===
                action.payload.size
              )
          ),
      };

    // ── Update quantity ──
    case ACTIONS.UPDATE_QTY: {

      const {
        id,
        size,
        qty,
      } = action.payload;

      // Remove if qty < 1
      if (qty < 1) {

        return {

          ...state,

          items:
            state.items.filter(
              (item) =>

                !(
                  item.id === id &&
                  item.size === size
                )
            ),
        };
      }

      return {

        ...state,

        items:
          state.items.map(
            (item) =>

              item.id === id &&
                item.size === size

                ? {
                  ...item,
                  qty,
                }

                : item
          ),
      };
    }

    // ── Clear cart ──
    case ACTIONS.CLEAR_CART:

      return {

        ...state,

        items: [],

        coupon: null,
      };

    // ── Apply coupon ──
    case ACTIONS.APPLY_COUPON:

      return {

        ...state,

        coupon:
          action.payload,
      };

    // ── Remove coupon ──
    case ACTIONS.REMOVE_COUPON:

      return {

        ...state,

        coupon: null,
      };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────
export function CartProvider({
  children,
}) {

  const [state, dispatch] =
    useReducer(
      cartReducer,
      initialState
    );

  // ─────────────────────────────
  // LOAD CART
  // ─────────────────────────────
  useEffect(() => {

    try {

      const stored =
        localStorage.getItem(
          "kriday_cart"
        );

      if (stored) {

        const parsed =
          JSON.parse(stored);

        dispatch({

          type:
            ACTIONS
              .LOAD_FROM_STORAGE,

          payload:
            parsed.items || [],
        });

        if (parsed.coupon) {

          dispatch({

            type:
              ACTIONS
                .APPLY_COUPON,

            payload:
              parsed.coupon,
          });
        }

      } else {

        dispatch({

          type:
            ACTIONS
              .LOAD_FROM_STORAGE,

          payload: [],
        });
      }

    } catch {

      dispatch({

        type:
          ACTIONS
            .LOAD_FROM_STORAGE,

        payload: [],
      });
    }

  }, []);

  // ─────────────────────────────
  // SAVE CART
  // ─────────────────────────────
  useEffect(() => {

    if (state.loaded) {

      localStorage.setItem(
        "kriday_cart",

        JSON.stringify({

          items: state.items,

          coupon: state.coupon,

        })
      );
    }

  }, [
    state.items,
    state.loaded,
  ]);

  // ─────────────────────────────
  // ACTIONS
  // ─────────────────────────────

  function addToCart(product) {

    dispatch({

      type:
        ACTIONS.ADD_ITEM,

      payload: product,
    });
  }

  function removeFromCart(
    id,
    size
  ) {

    dispatch({

      type:
        ACTIONS.REMOVE_ITEM,

      payload: {
        id,
        size,
      },
    });
  }

  function updateQty(
    id,
    size,
    qty
  ) {

    dispatch({

      type:
        ACTIONS.UPDATE_QTY,

      payload: {
        id,
        size,
        qty,
      },
    });
  }

  function clearCart() {

    dispatch({
      type:
        ACTIONS.CLEAR_CART,
    });
  }

  function isInCart(
    id,
    size
  ) {

    return state.items.some(
      (item) =>
        item.id === id &&
        item.size === size
    );
  }

  // ─────────────────────────────
  // COUPONS
  // ─────────────────────────────

  function applyCoupon(coupon) {

    dispatch({

      type:
        ACTIONS.APPLY_COUPON,

      payload: coupon,
    });
  }

  function removeCoupon() {

    dispatch({

      type:
        ACTIONS.REMOVE_COUPON,
    });
  }

  // ─────────────────────────────
  // COMPUTED VALUES
  // ─────────────────────────────

  const totalItems =
    state.items.reduce(

      (sum, item) =>
        sum + item.qty,

      0
    );

  const subtotal =
    state.items.reduce(

      (sum, item) =>

        sum +
        item.price * item.qty,

      0
    );

  const savings =
    state.items.reduce(

      (sum, item) => {

        if (
          item.originalPrice
        ) {

          return (
            sum +

            (
              item.originalPrice -
              item.price
            ) *

            item.qty
          );
        }

        return sum;
      },

      0
    );

  // ─────────────────────────────
  // SHIPPING
  // ─────────────────────────────

  const freeShippingThreshold =
    1999;

  const amountForFreeShipping =
    Math.max(
      0,

      freeShippingThreshold -
      subtotal
    );

  const hasFreeShipping =
    subtotal >=
    freeShippingThreshold;

  const shippingCost =
    hasFreeShipping
      ? 0
      : 99;

  // ─────────────────────────────
  // GST
  // ─────────────────────────────

  const gst =
    Math.round(
      subtotal * 0.03
    );

  // ─────────────────────────────
  // DISCOUNT
  // ─────────────────────────────

  let discount = 0;

  if (state.coupon) {

    // Percent coupon
    if (
      state.coupon.type ===
      "percent"
    ) {

      discount =
        Math.round(

          subtotal *

          (
            state.coupon.value /
            100
          )
        );
    }

    // Flat coupon
    if (
      state.coupon.type ===
      "flat"
    ) {

      discount =
        state.coupon.value;
    }
  }

  // ─────────────────────────────
  // FINAL TOTAL
  // ─────────────────────────────

  const total =
    subtotal +
    shippingCost +
    gst -
    discount;

  // ─────────────────────────────
  // PROVIDER
  // ─────────────────────────────
  return (

    <CartContext.Provider

      value={{

        // State
        items:
          state.items,

        loaded:
          state.loaded,

        coupon:
          state.coupon,

        // Actions
        addToCart,

        removeFromCart,

        updateQty,

        clearCart,

        isInCart,

        applyCoupon,

        removeCoupon,

        // Computed
        totalItems,

        subtotal,

        savings,

        shippingCost,

        gst,

        discount,

        total,

        hasFreeShipping,

        amountForFreeShipping,

        freeShippingThreshold,
      }}
    >

      {children}

    </CartContext.Provider>
  );
}

// ─────────────────────────────────────────────
// CUSTOM HOOK
// ─────────────────────────────────────────────
export function useCart() {

  const context =
    useContext(CartContext);

  if (!context) {

    throw new Error(
      "useCart must be used inside <CartProvider>"
    );
  }

  return context;
}