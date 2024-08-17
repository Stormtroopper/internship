const getTo_Do = (req, res) => {
    res.send('all items')
}
const creating_to_do = async (req, res) => {
    const task = await ToDo.create(req.body)
    res.status(201).json({ task })
}
const get_SingleTo_Do = (req, res) => {
    res.json({ id: req.params.id })
}
const updateTo_Do = (req, res) => {
    res.send('update items')
}
const delete_To_Do = (req, res) => {
    res.send('deleting items')
}
module.exports = { getTo_Do, creating_to_do, get_SingleTo_Do, updateTo_Do, delete_To_Do } 