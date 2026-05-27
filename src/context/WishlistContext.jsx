"use client";

import {

  createContext,

  useContext,

  useReducer,

  useEffect,

} from "react";

import {
  useAuth
}
from "@/context/AuthContext";

// ─────────────────────────────────────────────
// WISHLIST CONTEXT
// ─────────────────────────────────────────────
const WishlistContext =
  createContext(null);

// ─────────────────────────────────────────────
// ACTION TYPES
// ─────────────────────────────────────────────
const ACTIONS = {

  ADD_ITEM:
    "ADD_ITEM",

  REMOVE_ITEM:
    "REMOVE_ITEM",

  CLEAR_WISHLIST:
    "CLEAR_WISHLIST",

  LOAD_FROM_STORAGE:
    "LOAD_FROM_STORAGE",
};

// ─────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────
const initialState = {

  items: [],

  loaded: false,
};

// ─────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────
function wishlistReducer(
  state,
  action
) {

  switch (action.type) {

    // ─────────────────────────────
    // LOAD
    // ─────────────────────────────
    case ACTIONS.LOAD_FROM_STORAGE:

      return {

        ...state,

        items:
          action.payload,

        loaded: true,
      };

    // ─────────────────────────────
    // ADD
    // ─────────────────────────────
    case ACTIONS.ADD_ITEM: {

      // Prevent duplicates
      const exists =
        state.items.some(
          (i) =>
            i.id ===
            action.payload.id
        );

      if (exists)
        return state;

      return {

        ...state,

        items: [

          action.payload,

          ...state.items,

        ],
      };
    }

    // ─────────────────────────────
    // REMOVE
    // ─────────────────────────────
    case ACTIONS.REMOVE_ITEM:

      return {

        ...state,

        items:
          state.items.filter(
            (i) =>
              i.id !==
              action.payload
          ),
      };

    // ─────────────────────────────
    // CLEAR
    // ─────────────────────────────
    case ACTIONS.CLEAR_WISHLIST:

      return {

        ...state,

        items: [],
      };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────
export function WishlistProvider({
  children,
}) {

  const { user } =
    useAuth();

  const [state, dispatch] =
    useReducer(

      wishlistReducer,

      initialState
    );

  // ─────────────────────────────
  // USER-SPECIFIC STORAGE KEY
  // ─────────────────────────────
  const storageKey =

    user?.email

      ? `wishlist_${user.email}`

      : "wishlist_guest";

  // ─────────────────────────────
  // LOAD WISHLIST
  // ─────────────────────────────
  useEffect(() => {

    try {

      const stored =
        localStorage.getItem(
          storageKey
        );

      dispatch({

        type:
          ACTIONS
            .LOAD_FROM_STORAGE,

        payload:

          stored

            ? JSON.parse(
              stored
            )

            : [],
      });

    } catch (error) {

      console.log(error);

      dispatch({

        type:
          ACTIONS
            .LOAD_FROM_STORAGE,

        payload: [],
      });
    }

  }, [storageKey]);

  // ─────────────────────────────
  // SAVE WISHLIST
  // ─────────────────────────────
  useEffect(() => {

    if (state.loaded) {

      localStorage.setItem(

        storageKey,

        JSON.stringify(
          state.items
        )
      );
    }

  }, [

    state.items,

    state.loaded,

    storageKey,

  ]);

  // ─────────────────────────────
  // ADD
  // ─────────────────────────────
  function addToWishlist(
    product
  ) {

    dispatch({

      type:
        ACTIONS.ADD_ITEM,

      payload: product,
    });
  }

  // ─────────────────────────────
  // REMOVE
  // ─────────────────────────────
  function removeFromWishlist(
    id
  ) {

    dispatch({

      type:
        ACTIONS.REMOVE_ITEM,

      payload: id,
    });
  }

  // ─────────────────────────────
  // TOGGLE
  // ─────────────────────────────
  function toggleWishlist(
    product
  ) {

    if (
      isWishlisted(
        product.id
      )
    ) {

      removeFromWishlist(
        product.id
      );

    } else {

      addToWishlist(
        product
      );
    }
  }

  // ─────────────────────────────
  // CLEAR
  // ─────────────────────────────
  function clearWishlist() {

    dispatch({

      type:
        ACTIONS
          .CLEAR_WISHLIST,
    });
  }

  // ─────────────────────────────
  // CHECK
  // ─────────────────────────────
  function isWishlisted(
    id
  ) {

    return state.items.some(
      (i) => i.id === id
    );
  }

  // ─────────────────────────────
  // COMPUTED
  // ─────────────────────────────
  const totalWishlistItems =
    state.items.length;

  // ─────────────────────────────
  // PROVIDER
  // ─────────────────────────────
  return (

    <WishlistContext.Provider

      value={{

        // State
        items:
          state.items,

        loaded:
          state.loaded,

        // Actions
        addToWishlist,

        removeFromWishlist,

        toggleWishlist,

        clearWishlist,

        isWishlisted,

        // Computed
        totalWishlistItems,
      }}

    >

      {children}

    </WishlistContext.Provider>
  );
}

// ─────────────────────────────────────────────
// CUSTOM HOOK
// ─────────────────────────────────────────────
export function useWishlist() {

  const context =
    useContext(
      WishlistContext
    );

  if (!context) {

    throw new Error(

      "useWishlist must be used inside <WishlistProvider>"

    );
  }

  return context;
}