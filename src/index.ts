import { UserForm } from '../views/UserForm';

const u = new UserForm(document.getElementById('root')!);

u.render();

u.render2(component());

function component() {
  return `
    <div>
    <h1> hello this is render 2! </h2>
    </div>
    `;
}
