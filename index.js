document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item');
    const target = document.querySelector('.target');
  
    items.forEach(function(item) {
      item.addEventListener('dragstart', dragStart);
      item.addEventListener('dragend', dragEnd);
    });
  
    target.addEventListener('dragover', dragOver);
    target.addEventListener('dragenter', dragEnter);
    target.addEventListener('dragleave', dragLeave);
    target.addEventListener('drop', drop);
  });
  
  let draggedItems = [];
  
  function dragStart(event) {
    event.currentTarget.classList.add('dragging');
    draggedItems.push(event.currentTarget);
  
    // Disable drag events for the dragged item
    event.currentTarget.removeEventListener('dragstart', dragStart);
    event.currentTarget.removeEventListener('dragend', dragEnd);
  }
  
  
  function dragEnd(event) {
    event.currentTarget.classList.remove('dragging');
  }
  
  function dragOver(event) {
    event.preventDefault();
  }
  
  function dragEnter(event) {
    event.preventDefault();
    event.currentTarget.classList.add('highlight');
  }
  
  function dragLeave(event) {
    event.currentTarget.classList.remove('highlight');
  }
  
  function drop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('highlight');
  
    draggedItems.forEach(function(item) {
      item.classList.remove('dragging');
      const clonedItem = item.cloneNode(true);
      event.currentTarget.appendChild(clonedItem);
    });
  
    draggedItems = [];
    displaySuccessMessage();
  }
  
  function displaySuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.innerText = 'Items dropped successfully!';
    document.body.appendChild(successMessage);
    setTimeout(function() {
      successMessage.remove();
    }, 2000);
  }
  
  function resetContainers() {
    const source = document.querySelector('.source');
    const target = document.querySelector('.target');
    const items = source.querySelectorAll('.item');
  
    target.innerHTML = 'Drop items here';
  
    items.forEach(function(item) {
      item.style.opacity = '1';
      item.style.display = 'block';
      item.addEventListener('dragstart', dragStart);
      item.addEventListener('dragend', dragEnd);
      source.appendChild(item);
    });
  
    draggedItems = [];
  }
  