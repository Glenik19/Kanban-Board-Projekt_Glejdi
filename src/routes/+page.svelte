<script>
  import Column from './components/Column.svelte';

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

  function moveItem(targetList) {
    return (event) => {
      let item = +event.dataTransfer.getData("text/plain");
      listA = listA.filter(i => i !== item);
      listB = listB.filter(i => i !== item);
      listC = listC.filter(i => i !== item);
      listD = listD.filter(i => i !== item);
      targetList.push(item);
    };
  }
</script>

<h1 class="text-center">We learn now to drag and drop</h1>

<main class="p-8 w-full bg-gray-500 h-[400px] flex justify-between items-center">
  <Column list={listA} startDrag={startDrag} onDragOver={dragOver} onDrop={moveItem(listA)} />
  <Column list={listB} startDrag={startDrag} onDragOver={dragOver} onDrop={moveItem(listB)} />
  <Column list={listC} startDrag={startDrag} onDragOver={dragOver} onDrop={moveItem(listC)} />
  <Column list={listD} startDrag={startDrag} onDragOver={dragOver} onDrop={moveItem(listD)} />
</main>
