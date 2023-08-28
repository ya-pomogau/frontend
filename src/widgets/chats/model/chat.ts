import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';

import { IChat, IMessage } from '../libs/types';
import { getChatList, getMockMessages, sortMessages } from '../libs/utils';

type ChatState = {
  chatList: Array<IChat>;
  chatListLoading: boolean;
  chatListLoadError?: SerializedError | undefined;
  messagesList: Array<IMessage>;
  messagesListLoading: boolean;
  messagesListLoadError?: SerializedError | undefined;
};

const initialState: ChatState = {
  chatList: [],
  chatListLoading: false,
  chatListLoadError: undefined,
  messagesList: [],
  messagesListLoading: false,
  messagesListLoadError: undefined,
};

export const getSelectedChat = ({ chatList }: ChatState, chatId: string) => {
  return chatList.find((chat) => chat.chatId === chatId);
};

export const fetchChatList = createAsyncThunk('chat/fetchChats', async () => {
  return getChatList();
});

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (chatId: string) => {
    return sortMessages(getMockMessages());
  }
);

export const chatModel = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatList.pending, (state) => {
        state.chatListLoading = true;
        state.chatListLoadError = undefined;
      })
      .addCase(fetchChatList.fulfilled, (state, action) => {
        state.chatList = action.payload;
        state.chatListLoading = false;
      })
      .addCase(fetchChatList.rejected, (state, action) => {
        state.chatList = [];
        state.chatListLoadError = action.error;
        state.chatListLoading = false;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.messagesListLoading = true;
        state.messagesListLoadError = undefined;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messagesList = action.payload;
        state.messagesListLoading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messagesList = [];
        state.messagesListLoadError = action.error;
        state.messagesListLoading = false;
      });
  },
});
