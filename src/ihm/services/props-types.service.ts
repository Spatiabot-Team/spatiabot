/**
 * Contient différentes configurations pour les props des composants vue
 *
 * @example
 *
 * props: {
 *    isExtracted: T.DefaultBool(),
 *    label: T.ReqString
 *  }
 *
 */
export default {
    ReqString : {
        type: String,
        required: true,
    },
    ReqBool : {
        type: Boolean,
        required: true,
    },
    ReqNumber : {
        type: Number,
        required: true,
    },
    ReqArray: ({
        type: Array,
        required: true
    }),
    ReqObject: ({
        type: Object,
        required: true
    }),

    DefaultArray: (value = []) => ({
       type: Array,
       default: () => value
    }),
    DefaultBool: (value = false) => ({
        type: Boolean,
        default: value
    }),
    DefaultString: (value = "") => ({
        type: String,
        default: value
    }),
    DefaultNumber: (value = 0) => ({
        type: Number,
        required: false,
        default: value
    }),
    DefaultObject: (value = {}) => ({
        type: Object,
        default: () => value
    })
};
