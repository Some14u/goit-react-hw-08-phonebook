import connectionsApi, { contactsSliceTag } from './connectionsApi';

const contactsApiSlice = connectionsApi.injectEndpoints({
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/contacts',
      keepUnusedDataFor: Number.MAX_SAFE_INTEGER,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: contactsSliceTag, id })),
              { type: contactsSliceTag, id: 'LIST' },
            ]
          : [{ type: contactsSliceTag, id: 'LIST' }],
    }),
    addContact: builder.mutation({
      query: contact => ({
        url: '/contacts',
        method: 'POST',
        body: { ...contact },
      }),
      invalidatesTags: [{ type: contactsSliceTag, id: 'LIST' }],
    }),
    editContact: builder.mutation({
      query: ( {id, ...rest} ) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: { ...rest },
      }),
      invalidatesTags: (_, __, arg) => [{ type: contactsSliceTag, id: arg.id }],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [{ type: contactsSliceTag, id: arg }],
    }),
  }),
});

export default contactsApiSlice;
export const {
  useGetContactsQuery,
  useAddContactMutation,
  useEditContactMutation,
  useDeleteContactMutation,
} = contactsApiSlice;
