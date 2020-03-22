class GradeForm {
  constructor(formElement) {
    this.editing = null;
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
    this.handleCancel = this.handleCancel.bind(this);
    this.formElement.addEventListener('reset',this.handleCancel);
  }
  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }
  onEdit(editGrade) {
    this.editGrade = editGrade;
  }
  editMode(data) {
    this.editing = data;
    this.formElement.querySelector('#form-title').textContent = 'Edit Grade';
    this.formElement.querySelector('#student-name-input').value = data.name;
    this.formElement.querySelector('#student-course-input').value = data.course;
    this.formElement.querySelector('#student-grade-input').value = data.grade;
    this.formElement.querySelector('.btn-success').value = 'Edit';
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);

    if (this.editing) {
      this.editGrade(this.editing.id, formData.get('name'), formData.get('course'), formData.get('grade'));
    } else {
      this.createGrade(formData.get('name'), formData.get('course'), formData.get('grade'));
    }
    this.resetForm(event);
  }
  handleCancel(event) {
    this.resetForm(event);
  }
  resetForm(event) {
    this.editing = null;
    this.formElement.querySelector('.btn-success').value = 'Add';
    this.formElement.querySelector('#form-title').textContent = 'Add Grade';
    event.target.reset();
  }
}
