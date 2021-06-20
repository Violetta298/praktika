
const block = document.querySelector('.block')
const unblock = document.querySelector('.unblock')
const setapi = document.querySelector('.setapi')
const give = document.querySelector('.give')
const remove = document.querySelector('.remove')

block && block.addEventListener('click', async (e) => {
    await fetch(`/admin/blocked/${e.target.dataset.id}`, {
        method: 'PATCH',
    })
    window.location.reload()
})

unblock && unblock.addEventListener('click', async (e) => {
    await fetch(`/admin/unblocked/${e.target.dataset.id}`, {
        method: 'PATCH',
    })
    window.location.reload()
})

setapi && setapi.addEventListener('click', async (e) => {
    await fetch(`/admin/setapi/${e.target.dataset.id}`, {
        method: 'PATCH',
    })
    window.location.reload()
})

give && give.addEventListener('click', async (e) => {
    await fetch(`/admin/give/${e.target.dataset.id}`, {
        method: 'PATCH',
    })
    window.location.reload()
})

remove && remove.addEventListener('click', async (e) => {
    await fetch(`/admin/remove/${e.target.dataset.id}`, {
        method: 'PATCH',
    })
    window.location.reload()
})