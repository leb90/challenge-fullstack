import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import FileList from "../pages/FileList";

const mockStore = configureMockStore([thunk]);

describe("FileList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      fileReducer: {
        files: [
          {
            file: "file1.txt",
            lines: [
              { text: "line1", number: 1, hex: "0x001" },
              { text: "line2", number: 2, hex: "0x002" },
            ],
          },
          {
            file: "file2.txt",
            lines: [
              { text: "line1", number: 1, hex: "0x001" },
              { text: "line2", number: 2, hex: "0x002" },
            ],
          },
        ],
        loading: false,
        error: null,
      },
    });
  });

  test("renders file list", async () => {
    const files = [
      { name: "file1.txt", text: "line1", number: 1, hex: "0x001" },
      { name: "file1.txt", text: "line2", number: 2, hex: "0x002" },
      { name: "file2.txt", text: "line1", number: 1, hex: "0x001" },
      { name: "file2.txt", text: "line2", number: 2, hex: "0x002" },
    ];
    render(
      <Provider store={store}>
        <FileList files={files} />
      </Provider>
    );

    await waitFor(() => {
      files.forEach((file) => {
        const fileList = screen.getAllByTestId(`file-name-${file.name}`);
        expect(fileList.length).toBe(2);
      });
    });
  });

  test("renders without crashing", () => {
    const files = [];
    render(
      <Provider store={store}>
        <FileList files={files} />
      </Provider>
    );
  });

  test("displays 'No files found' message when no files are present", () => {
    store = mockStore({
      fileReducer: {
        files: [],
        loading: false,
        error: null,
      },
    });
    const files = [];
    render(
      <Provider store={store}>
        <FileList files={files} />
      </Provider>
    );
    const fileList = screen.getAllByTestId("file-name-no-file");
    expect(fileList.length).toBe(1);
  });
});
