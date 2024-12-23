export const apiRoutes = {
  // User Management
  userLogin: 'user/login',
  userLogout: 'user/logout',
  userRefresh: 'user/refresh',
  userList: 'user/users',

  // Employee Management
  employee: 'hr/employee',
  employees: 'hr/employees',
  employeeRemove: 'hr/employee/{id}',

  // Banks
  banks: 'finance/banks',

  //Cash Account
  cashAccounts:'accounting/cashAccounts',
  cashAccount:'accounting/cashAccount/{cashAccountId}',
  cashAccountAdd:'accounting/cashAccount',
  cashAccountDelete:'accounting/cashAccount/{cashAccountId}',
  cashAccountUpdate:'accounting/cashAccount/{cashAccountId}',

  //Admin / Depot 
  depots:'admin/depots',
  depot:'admin/depot/{depotId}',
  depotAdd:'admin/depot',
  depotDelete:'admin/depot/{depotId}',
  depotUpdate: 'admin/depot/{depotId}',

  //Admin / Machine
  machines:'admin/machines',
  machine:'admin/machine/{machineId}',
  machineAdd:'admin/machine',
  machineDelete:'admin/machine/{machineId}',
  machineUpdate:'admin/machine/{machineId}',

  //Storage / AssignmentCard
  assignmentCards:'storage/assignmentCards',
  assignmentCard:'storage/assignmentCard/{assignmentCardId}',
  assignmentCardAdd:'storage/assignmentCard',
  assignmentCardDelete:'storage/assignmentCard/{assignmentCardId}',
  assignmentCardUpdate:'storage/assignmentCard/{assignmentCardId}',

  //Storage / FixtureCard
  fixtureCards: 'storage/fixtureCards',
  fixtureCard:'storage/fixtureCard/{fixtureCardId}',
  fixtureCardAdd:'storage/fixtureCard',
  fixtureCardDelete:'storage/fixtureCard/{fixtureCardId}',
  fixtureCardUpdate:'storage/fixtureCard/{fixtureCardId}',

  //Storage / Invoice
  invoices: 'storage/invoices',
  invoice:'storage/invoice/{invoiceId}',
  invoiceAdd:'storage/invoice',
  invoiceDelete:'storage/invoice/{invoiceId}',
  invoiceUpdate:'storage/invoice/{invoiceId}',

  //Storage / AssignmentTransaction
  assignmentTransactions:'storage/assignmentTransactions',
  assignmentTransaction:'storage/assignmentTransaction/{assignmentTransactionId}',
  assignmentTransactionAdd:'storage/assignmentTransaction',
  assignmentTransactionDelete:'storage/assignmentTransaction/{assignmentTransactionId}',
  assignmentTransactionUpdate:'storage/assignmentTransaction/{assignmentTransactionId}',


  // Employee Vacation Management
  employeeVacationStatuses: 'hr/employees/timeoffstatuses',
  employeeVacation: 'hr/employee/{employeeId}/timeoffs',
  employeeVacationAdd: 'hr/employee/{employeeId}/timeoff',
  employeeVacationDelete: 'hr/employee/{employeeId}/timeoff/{timeOffId}',
  employeeVacationUpdate: 'hr/employee/{employeeId}/timeoff/{timeOffId}',

  // Employee Payroll Management
  employeePayrollData: 'hr/employee/payrollData',

  // Employee Payment Management
  employeePayments: 'hr/employee/payments',
  employeePayment: 'hr/employee/payment',
  employeeAddPayment: 'hr/employee/{employeeId}/payment',
  employeeUpdatePayment: 'hr/employee/{employeeId}/payment',
  employeeDeletePayment: 'hr/employee/{employeeId}/payment/{paymentId}',

  // Employee Overtime Management
  employeeAddOvertime: 'hr/employee/{employeeId}/overtime',
  employeeUpdateOvertime: 'hr/employee/{employeeId}/overtime',
  employeeDeleteOvertime: 'hr/employee/{employeeId}/overtime/{overtimeId}',

  // Department Management
  department: 'company/department',
  departments: 'company/departments',

  //Branch Management
  branches: 'company/branches',
  branchAdd: 'company/branch',

  // Time Keeping
  timeKeepingDraft: 'hr/timekeeping/draft/employee/{employeeId}/year/{year}/month/{month}',
  timeKeepingCreate: 'hr/timekeeping',
  timeKeepingUpdate: 'hr/timekeeping',
  timeKeepings: 'hr/timekeepings',
  timeKeeping: 'hr/timekeeping',
  timeKeepingCalculateTotal: 'hr/timekeeping/calculateTotal'
}