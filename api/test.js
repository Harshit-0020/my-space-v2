export default (req, res) => {
    res.sendFile((path.join(initial_path, "test.html")));
}
