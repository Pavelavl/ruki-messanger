export const attachmentsActions = {
  setAttachments: (items: any) => ({
    type: "ATTACHMENTS:SET_ITEMS",
    payload: items,
  }),
  removeAttachment: (file: any) => ({
    type: "ATTACHMENTS:REMOVE_ITEM",
    payload: file,
  }),
};
