import { catConsts } from "../actions/constants"

const initState = {
    loading: false,
    categories: [],
    error: null,
    curCat: '',
    parentcats: []
}

const buildNewCats = (parentId, categories, category) => {
    let catList = []

    if (parentId === undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }

    for (let cat of categories) {
        if (cat._id === parentId) {
            catList.push({
                ...cat,
                children: cat.children ? buildNewCats(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            })
        }
        else {
            catList.push({
                ...cat,
                children: cat.children ? buildNewCats(parentId, cat.children, category) : []
            })
        }
    }
    return catList
}

export default (state = initState, action) => {
    switch (action.type) {
        case catConsts.CATEGORY_FETCH_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false
            }
            break

        case catConsts.CATEGORY_FETCH_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break

        case catConsts.CATEGORY_FETCH_FAILED:
            state = {
                ...initState
            }
            break

        case catConsts.CATEGORY_CREATE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break

        case catConsts.CATEGORY_CREATE_SUCCESS:

            const category = action.payload.category
            const updatedCatList = buildNewCats(category.parentId, state.categories, category)

            state = {
                ...state,
                categories: updatedCatList,
                loading: false
            }
            break

        case catConsts.CATEGORY_CREATE_FAILED:
            state = {
                ...initState
            }
            break

        case catConsts.GET_CAT_BY_SLUG_SUCCESS:
            state = {
                ...state,
                curCat: action.payload
            }
            break

        case catConsts.FETCH_CATEGORY_PATH_SUCCESS:
            state = {
                ...state,
                parentcats: action.payload
            }
            break
    }
    return state
}