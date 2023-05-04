import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../redux/actions/fileActions";
import { Table, Navbar, Container } from "react-bootstrap";
import React from "react";
import styles from "../styles/FileList.module.css";

const FileList = () => {
  const dispatch = useDispatch();
  const fileState = useSelector((state) => state.fileReducer);

  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  const renderFileRows = (fileElement) => {
    const fileName = fileElement?.file;
    {
      return fileElement?.lines?.length > 0 &&
        fileElement?.lines.map((e, i) => (
          <tr key={i}>
            <td data-testid={`file-name-${fileName}`}>{fileName}</td>
            <td>{e.text}</td>
            <td>{e.number}</td>
            <td>{e.hex}</td>
          </tr>
        ));
    }
  };

  return (
    <div className={styles.container}>
      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand>React Test App</Navbar.Brand>
        </Container>
      </Navbar>
      <div className={styles.tableContainer}>
        {fileState?.loading && <p>Loading...</p>}
        {fileState?.error && (
          <p>Unable to retrieve file list: {fileState.error}</p>
        )}
        {!fileState?.loading &&
          !fileState?.error &&
          fileState?.files?.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Text</th>
                  <th>Number</th>
                  <th>Hex</th>
                </tr>
              </thead>
              <tbody>
                {fileState?.files.map((fileElement, index) => (
                  <React.Fragment key={index}>
                    {renderFileRows(fileElement)}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          )}
        {!fileState?.loading &&
          !fileState?.error &&
          fileState?.files?.length === 0 && <p data-testid={`file-name-no-file`}>No files found.</p>}
      </div>
    </div>
  );
};

export default FileList;
