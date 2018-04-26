const mapState = state => ({ isVisible: state.fileTree.isVisible });

const mapDispatch = dispatch => ({ toggleVisibility: filePath => dispatch(toggleVisibility(filePath)) });

const ConnectFileTree = connect(mapState, mapDispatch)(FileTree);
