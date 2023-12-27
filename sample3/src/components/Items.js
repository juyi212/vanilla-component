import Component from "../core/Component.js";

export default class Items extends Component {
  template() {
    const { filteredItems } = this.$props;
    return `
      <ul>
        ${filteredItems
          .map(
            ({ contents, active, seq, updateStatus }) => `
          <li data-seq="${seq}">
            ${
              updateStatus
                ? `<input class='updateAppender' placeholder=${contents} />`
                : contents
            }
            <button class="toggleBtn" style="color: ${
              active ? "#09F" : "#F09"
            }">
              ${active ? "활성" : "비활성"}
            </button>
            <button class="deleteBtn">삭제</button>

            ${
              updateStatus
                ? `<button class="saveBtn">저장</button>`
                : `<button class="updateBtn">수정</button>`
            }
            
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  setEvent() {
    const { deleteItem, toggleItem, updateItem, saveItem } = this.$props;

    this.addEvent("click", ".deleteBtn", ({ target }) => {
      deleteItem(Number(target.closest("[data-seq]").dataset.seq));
    });

    this.addEvent("click", ".toggleBtn", ({ target }) => {
      toggleItem(Number(target.closest("[data-seq]").dataset.seq));
    });

    this.addEvent("click", ".updateBtn", ({ target }) => {
      updateItem(Number(target.closest("[data-seq]").dataset.seq));
    });

    this.addEvent("click", ".saveBtn", ({ target }) => {
      const appenderInput = this.$target.querySelector(".updateAppender");

      saveItem(
        Number(target.closest("[data-seq]").dataset.seq),
        appenderInput.value
      );
    });
  }
}
