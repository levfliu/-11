const deleteTreeItem = function (value, tree, pAttr = 'id', cAttr = 'parentId', childAttr = 'children') {
    if (!(tree instanceof Array)) {
        console.error('tree: 请传入树形数组进行过滤')
        return null
    }
    if (tree.length === 0) return

    for (let i = 0; i < tree.length; i++) {
        const item = tree[i]
        if (item[pAttr] === value[cAttr]) {
            tree.splice(i, 1)
            return
        } else {
            if (item[childAttr]) {
                deleteTreeItem(value, item[childAttr], pAttr, cAttr, childAttr)
            }
        }
    }

    return null
}

const addTreeItem = function (value, tree, pAttr = 'id', cAttr = 'parentId', childAttr = 'children') {
    if (!(tree instanceof Array)) {
        console.error('tree: 请传入树形数组进行过滤')
        return null
    }
    if (tree.length === 0) return

    for (let i = 0; i < tree.length; i++) {
        const item = tree[i]

        if (item[pAttr] === value[cAttr]) {
            // 如果找到， 则跳出
            if (item[childAttr]) {
                item[childAttr].push(value)
            } else {
                item[childAttr] = []
                item[childAttr].push(value)
            }
        }
        if (item[childAttr]) {
            addTreeItem(value, item[childAttr], pAttr, cAttr, childAttr)
        }
    }
    return null
}

const guid = function (_) {
    if(_=='_')
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0
        var v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0
        var v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

const getPlusOne = function (list, attr = 'sort') {
    if (!list || list.length === 0) {
        return 1
    }
    let arr = []
    list.forEach(e => {
        arr.push(isNaN(e[attr]) ? 0 : e[attr])
    })
    var max = Math.max.apply(null, arr)
    return max + 1
}
export { addTreeItem, guid, getPlusOne, deleteTreeItem }
