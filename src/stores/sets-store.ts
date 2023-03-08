import { createStore } from 'vuex';
import { SetId } from "../dominion/set-id";
import { windowStore } from "./window/window-store";
import type { State as WindowStoreState } from "./window/window-store";
import { store as i18nStore } from "./i18n/store";
import type { State as I18nState } from "./i18n/store";
import { SortOption } from "../settings/settings";

export interface State {
  selectedSetId: SetId;
  sortSet: string;
  selectedBoxesSetId: SetId;
  sortBoxesSet: string;
  showFilterKingdom: boolean;
  showFilterPlayGames: string;
  needRefresh: number;
  window: WindowStoreState;
  i18n: I18nState;
}

export default createStore({
  state: {
    selectedSetId: SetId.BASE_SET,
    sortSet: SortOption.SET,
    selectedBoxesSetId: SetId.BASE_SET,
    sortBoxesSet: SortOption.ALPHABETICAL,
    showFilterKingdom: false,
    showFilterPlayGames: "PNP",
    needRefresh: 0
  } as State,
  mutations: {
    UPDATE_SELECTED_SET (state: State, setId: SetId) {
      state.selectedSetId = setId;
    },
    UPDATE_SELECTED_BOXESSET (state: State, setId: SetId) {
      state.selectedBoxesSetId = setId;
    },
    UPDATE_SHOW_FILTER_KINGDOM (state: State, showFilterKingdom: boolean) {
      state.showFilterKingdom = showFilterKingdom;
    },
    UPDATE_FILTER_PLAYED_GAMES (state: State, showFilterPlayGames: string) {
      state.showFilterPlayGames = showFilterPlayGames;
    },
    UPDATE_NEED_REFRESH (state: State) {
      state.needRefresh = state.needRefresh +1;
    },
    UPDATE_SORT_SET (state: State, sortOption: string) {
      state.sortSet = sortOption;
    },
    UPDATE_SORT_BOXES_SET (state: State, sortOption: string) {
      state.sortBoxesSet = sortOption;
    }
  },
  modules: {
    window: windowStore,
    i18n: i18nStore,
  }
});
