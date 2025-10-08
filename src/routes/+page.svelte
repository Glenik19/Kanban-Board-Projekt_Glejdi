<script>
  import Column from '$lib/components/Column.svelte';

  let listA = [1,2,3];
  let listB = [4];
  let listC = [5,6,7];
  let listD = [8,9];

  function startDrag(item, event) {
    event.dataTransfer.setData("text/plain", item);
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function moveItem(target) {
    return (event) => {
      let item = +event.dataTransfer.getData("text/plain");

      // Item aus allen Listen entfernen
      listA = listA.filter(i => i !== item);
      listB = listB.filter(i => i !== item);
      listC = listC.filter(i => i !== item);
      listD = listD.filter(i => i !== item);

      // In die Ziel-Liste einfügen
      if (target === "A") listA = [...listA, item];
      if (target === "B") listB = [...listB, item];
      if (target === "C") listC = [...listC, item];
      if (target === "D") listD = [...listD, item];
    };
  }
</script>

<main class="p-8 w-full bg-gray-500 h-[400px] flex justify-between items-center">
  <Column list={listA} startDrag={startDrag} onDragOver={dragOver} onDrop={moveItem("A")} />
  <Column list={listB} startDrag={startDrag} onDragOver={dragOver} onDrop={moveItem("B")} />
  <Column list={listC} startDrag={startDrag} onDragOver={dragOver} onDrop={moveItem("C")} />
  <Column list={listD} startDrag={startDrag} onDragOver={dragOver} onDrop={moveItem("D")} />
</main>
