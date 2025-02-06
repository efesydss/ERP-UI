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



  // Accounting / Cash Account
  cashAccounts:'accounting/cashAccounts',
  cashAccount:'accounting/cashAccount/{cashAccountId}',
  cashAccountAdd:'accounting/cashAccount',
  cashAccountDelete:'accounting/cashAccount/{cashAccountId}',
  cashAccountUpdate:'accounting/cashAccount/{cashAccountId}',

   // Accounting / Cash Account Transaction
    cashAccountTransactions:'accounting/cashAccountTransactions',
    cashAccountTransaction:'accounting/cashAccountTransaction/{cashAccountTransactionId}',
    cashAccountTransactionAdd:'accounting/cashAccountTransaction',
    cashAccountTransactionDelete:'accounting/cashAccountTransaction/{cashAccountTransactionId}',
    cashAccountTransactionUpdate:'accounting/cashAccountTransaction/{cashAccountTransactionId}',

   // Purchasing / Current Account
    currentAccounts:'purchasing/currentAccounts',
    currentAccount:'purchasing/currentAccount/{currentAccountId}',
    currentAccountAdd:'purchasing/currentAccount',
    currentAccountDelete:'purchasing/currentAccount/{currentAccountId}',
    currentAccountUpdate:'purchasing/currentAccount/{currentAccountId}',

    // Purchasing / Current Account Bank Account
    currentAccountBankAccounts:'purchasing/currentAccountBankAccounts',
    currentAccountBankAccount:'purchasing/currentAccountBankAccount/{currentAccountBankAccountId}',
    currentAccountBankAccountAdd:'purchasing/currentAccountBankAccount',
    currentAccountBankAccountDelete:'purchasing/currentAccountBankAccount/{currentAccountBankAccountId}',
    currentAccountBankAccountUpdate:'purchasing/currentAccountBankAccount/{currentAccountBankAccountId}',

    // Finance / Bank Branch
    bankBranches:'finance/bankBranches',
    bankBranch:'finance/bankBranch/{bankBranchId}',
    bankBranchAdd:'finance/bankBranch',
    bankBranchDelete:'finance/bankBranch/{bankBranchId}',
    bankBranchUpdate:'finance/bankBranch/{bankBranchId}',

    // Purchasing / Additional Cost
    additionalCosts:'purchasing/additionalcosts',
    additionalCost:'purchasing/additionalcost/{additionalCostId}',
    additionalCostAdd:'purchasing/additionalcost',
    additionalCostDelete:'purchasing/additionalcost/{additionalCostId}',
    additionalCostUpdate:'purchasing/additionalcost/{additionalCostId}',

    // Purchasing / Current Account Transaction
    currentAccountTransactions:'purchasing/currentAccountTransactions',
    currentAccountTransaction:'purchasing/currentAccountTransaction/{currentAccountTransactionId}',
    currentAccountTransactionAdd:'purchasing/currentAccountTransaction',
    currentAccountTransactionDelete:'purchasing/currentAccountTransaction/{currentAccountTransactionId}',
    currentAccountTransactionUpdate:'purchasing/currentAccountTransaction/{currentAccountTransactionId}',

     // Purchasing / Purchase Order
        purchaseOrders:'purchasing/purchaseOrders',
        purchaseOrder:'purchasing/purchaseOrder/{purchaseOrderId}',
        purchaseOrderAdd:'purchasing/purchaseOrder',
        purchaseOrderDelete:'purchasing/purchaseOrder/{purchaseOrderId}',
        purchaseOrderUpdate:'purchasing/purchaseOrder/{purchaseOrderId}',

    // Production / Project
    projects:'production/projects',
    project:'production/project/{projectId}',
    projectAdd:'production/project',
    projectDelete:'production/project/{projectId}',
    projectUpdate:'production/project/{projectId}',

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

  //Storage / MaterialCard
    materialCards: 'storage/materialCards',
    materialCard: 'storage/materialCard/{materialCardId}',
    materialCardAdd: 'storage/materialCard',
    materialCardDelete: 'storage/materialCard/{materialCardId}',
    materialCardUpdate: 'storage/materialCard/{materialCardId}',

    //Storage / MaterialGroup
    materialGroups: 'storage/materialGroups',
    materialGroup: 'storage/materialGroup/{materialGroupId}',
    materialGroupAdd: 'storage/materialGroup',
    materialGroupDelete: 'storage/materialGroup/{materialGroupId}',
    materialGroupUpdate: 'storage/materialGroup/{materialGroupId}',
    materialTree: 'storage/materialGroup/tree',

    //Storage / Product Group
    productGroups: 'storage/productGroups',
    productGroup: 'storage/productGroup/{productGroupId}',
    productGroupAdd: 'storage/productGroup',
    productGroupDelete: 'storage/productGroup/{productGroupId}',
    productGroupUpdate: 'storage/productGroup/{productGroupId}',
    productTree: 'storage/productGroup/tree',

  //Storage / FixtureCard
  fixtureCards: 'storage/fixtureCards',
  fixtureCard:'storage/fixtureCard/{fixtureCardId}',
  fixtureCardAdd:'storage/fixtureCard',
  fixtureCardDelete:'storage/fixtureCard/{fixtureCardId}',
  fixtureCardUpdate:'storage/fixtureCard/{fixtureCardId}',

  //Storage / Invoice
  invoices: 'purchasing/invoices',
  invoice:'purchasing/invoice/{invoiceId}',
  invoiceAdd:'purchasing/invoice',
  invoiceDelete:'purchasing/invoice/{invoiceId}',
  invoiceUpdate:'purchasing/invoice/{invoiceId}',

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


   // Sales / Proposal
    proposals:'sales/proposals',
    proposal:'sales/proposal/{proposalId}',
    proposalAdd:'sales/proposal',
    proposalDelete:'sales/proposal/{proposalId}',
    proposalUpdate:'sales/proposal/{proposalId}',





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





  // Time Keeping
  timeKeepingDraft: 'hr/timekeeping/draft/employee/{employeeId}/year/{year}/month/{month}',
  timeKeepingCreate: 'hr/timekeeping',
  timeKeepingUpdate: 'hr/timekeeping',
  timeKeepings: 'hr/timekeepings',
  timeKeeping: 'hr/timekeeping',
  timeKeepingCalculateTotal: 'hr/timekeeping/calculateTotal'
}