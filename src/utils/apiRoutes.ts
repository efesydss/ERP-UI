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

    //Admin / Company
    companies:'admin/companies',
    company:'admin/company/{companyId}',
    companyAdd:'admin/company',
    companyDelete:'admin/company/{companyId}',
    companyUpdate:'admin/company/{companyId}',


  //Admin / PaymentMethod
  paymentMethods:'admin/paymentMethods',
  paymentMethod:'admin/paymentMethod/{paymentMethodId}',
  paymentMethodAdd:'admin/paymentMethod',
  paymentMethodDelete:'admin/paymentMethod/{paymentMethodId}',
  paymentMethodUpdate:'admin/paymentMethod/{paymentMethodId}',

    //Admin / Section
    sections:'admin/sections',
    section:'admin/section/{sectionId}',
    sectionAdd:'admin/section',
    sectionDelete:'admin/section/{sectionId}',
    sectionUpdate:'admin/section/{sectionId}',

  //Admin / Role
    roles:'admin/roles',
    role:'admin/role/{roleId}',
    roleAdd:'admin/role',
    roleDelete:'admin/role/{roleId}',
    roleUpdate:'admin/role/{roleId}',

  //Admin / PublicHoliday
  publicHolidays:'admin/publicHolidays',
  publicHoliday:'admin/publicHoliday/{publicHolidayId}',
  publicHolidayAdd:'admin/publicHoliday',
  publicHolidayDelete:'admin/publicHoliday/{publicHolidayId}',
  publicHolidayUpdate:'admin/publicHoliday/{publicHolidayId}',



  //Admin / Machine
  machines:'admin/machines',
  machine:'admin/machine/{machineId}',
  machineAdd:'admin/machine',
  machineDelete:'admin/machine/{machineId}',
  machineUpdate:'admin/machine/{machineId}',

     //Accounting / ExpenseCard
        expenseCards:'accounting/expenseCards',
        expenseCard:'accounting/expenseCard/{expenseCardId}',
        expenseCardAdd:'accounting/expenseCard',
        expenseCardDelete:'accounting/expenseCard/{expenseCardId}',
        expenseCardUpdate:'accounting/expenseCard/{expenseCardId}',

  //Company / Branch
    branches:'company/branches',
    branch:'company/branch/{branchId}',
    branchAdd:'company/branch',
    branchDelete:'company/branch/{branchId}',
    branchUpdate:'company/branch/{branchId}',

    //Company / Department
    departments:'company/departments',
    department:'company/department/{departmentId}',
    departmentAdd:'company/department',
    departmentDelete:'company/department/{departmentId}',
    departmentUpdate:'company/department/{departmentId}',

    //Finance / Banks
    banks:'finance/banks',
    bank:'finance/bank/{bankId}',
    bankAdd:'finance/bank',
    bankDelete:'finance/bank/{bankId}',
    bankUpdate:'finance/bank/{bankId}',


    //Finance / BankAccount
    bankAccounts:'finance/bankAccounts',
    bankAccount:'finance/bankAccount/{bankAccountId}',
    bankAccountAdd:'finance/bankAccount',
    bankAccountDelete:'finance/bankAccount/{bankAccountId}',
    bankAccountUpdate:'finance/bankAccount/{bankAccountId}',
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

  //Storage / Shelf
    shelves:'storage/shelves',
    shelf:'storage/shelf/{shelfId}',
    shelfAdd:'storage/shelf',
    shelfDelete:'storage/shelf/{shelfId}',
    shelfUpdate:'storage/shelf/{shelfId}',

  //Storage / Unit
    units:'storage/units',
    unit:'storage/unit/{unitId}',
    unitAdd:'storage/unit',
    unitDelete:'storage/unit/{unitId}',
    unitUpdate:'storage/unit/{unitId}',

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