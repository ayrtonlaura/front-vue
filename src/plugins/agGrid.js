import { AgGridVue } from "ag-grid-vue3"; // the AG Grid Vue Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";

// Código de licencia temporal (solo para desarrollo)
LicenseManager.setLicenseKey(
  "For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Valid_Until_1_March_2023__MTY0NTc4MjgwMDAwMA=="
);

//
// TODO: Se debe mejorar sobre esta limpieza de log.warn y log.error, porque podrian ocultar errores al ejecutarse
// console.warn = () => {}
// console.error = () => {}

export function registrar(app) {
  app.component("AgGridVue", AgGridVue);
}
