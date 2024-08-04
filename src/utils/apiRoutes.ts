export const apiRoutes = {
  // User Management
  userLogin: 'user/login',
  userLogout: 'user/logout',
  userRefresh: 'user/refresh',
  userList: 'user/users',

  // Employee Management
  employee: 'hr/employee',
  employees: 'hr/employees',

  // Employee Vacation Management
  employeeVacationStatuses: 'hr/employees/timeoffstatuses',
  employeeVacation: 'hr/employee/{employeeId}/timeoffs',
  employeeVacationAdd: 'hr/employee/{employeeId}/timeoff',
  employeeVacationDelete: 'hr/employee/{employeeId}/timeoff/{timeOffId}',

  // Employee Payroll Management
  employeePayrollData: 'hr/employee/payrollData',

  // Employee Payment Management
  employeePayments: 'hr/employee/payments',
  employeePayment: 'hr/employee/payment',

  // Department Management
  department: 'company/department',
  departments: 'company/departments',

  //Branch Management
  branches: 'company/branches',
  branchAdd: 'company/branch',

  // Time Keeping
  timeKeepingDraft: 'hr/timekeeping/draft/employee/{employeeId}/year/{year}/month/{month}'
}
