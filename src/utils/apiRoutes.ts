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
  employeeVacations: 'hr/employee/timeoffs',
  employeeVacation: 'hr/employee/vacation',

  // Employee Payroll Management
  employeePayrollData: 'hr/employee/payrollData',

  // Employee Payment Management
  employeePayments: 'hr/employee/payments',
  employeePayment: 'hr/employee/payment',

  // Department Management
  department: 'company/department',
  departments: 'company/departments',

  // Time Keeping
  timeKeepingDraft: 'hr/timekeeping/draft/employee'
}
