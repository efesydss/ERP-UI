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
