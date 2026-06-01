const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  // البيانات الشخصية - Personal Information
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['ذكر', 'أنثى', 'Male', 'Female'],
    required: true
  },
  nationalId: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: String,
  
  // معلومات طبية - Medical Information
  medicalHistory: {
    chronicDiseases: [String], // أمراض مزمنة
    allergies: [String], // الحساسيات
    previousSurgeries: [String], // العمليات السابقة
    medications: [String] // الأدوية الحالية
  },
  
  // البيانات الحيوية - Vital Signs
  vitalSigns: {
    height: Number, // الطول
    weight: Number, // الوزن
    bloodPressure: String, // ضغط الدم
    heartRate: Number, // نبض القلب
    respiratoryRate: Number, // معدل التنفس
    temperature: Number, // درجة الحرارة
    oxygenSaturation: Number, // تشبع الأكسجين
    lastUpdated: Date
  },
  
  // الأعراض - Symptoms
  symptoms: [{
    symptom: String,
    severity: {
      type: String,
      enum: ['خفيف', 'متوسط', 'شديد', 'mild', 'moderate', 'severe']
    },
    duration: String, // المدة (أيام/أسابيع/أشهر)
    dateReported: Date,
    notes: String
  }],
  
  // الفحوصات - Examinations
  examinations: [{
    examinationType: String, // نوع الفحص
    date: Date,
    results: String,
    notes: String,
    doctor: String,
    status: {
      type: String,
      enum: ['اكتمل', 'قيد الانتظار', 'completed', 'pending']
    }
  }],
  
  // الأشعات - Imaging
  imaging: [{
    imagingType: String, // نوع الأشعة (X-ray, CT, MRI, etc)
    date: Date,
    fileUrl: String, // رابط الملف
    findings: String, // النتائج
    radiologist: String,
    aiAnalysis: {
      findings: String,
      confidence: Number, // 0-1
      abnormalities: [String]
    }
  }],
  
  // الفحوصات الوظيفية للرئة - Pulmonary Function Tests
  pulmonaryTests: [{
    testType: String, // FVC, FEV1, etc
    date: Date,
    results: {
      fvc: Number, // Forced Vital Capacity
      fev1: Number, // Forced Expiratory Volume
      fev1Fvc: Number,
      ratio: Number
    },
    interpretation: String,
    doctor: String
  }],
  
  // التشخيص - Diagnosis
  diagnosis: [{
    diagnosisDate: Date,
    condition: String,
    icdCode: String, // رمز ICD-10
    severity: String,
    confidence: Number, // درجة الثقة من نموذج AI
    suggestedBy: String, // طبيب أو نموذج AI
    status: {
      type: String,
      enum: ['مؤكد', 'مراجع', 'مرفوض', 'confirmed', 'pending', 'rejected']
    }
  }],
  
  // المعالجة - Treatment Plan
  treatmentPlan: [{
    planId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['نشط', 'مكتمل', 'موقوف', 'active', 'completed', 'suspended']
    },
    medications: [{
      medicationName: String,
      dosage: String,
      frequency: String,
      duration: String,
      side_effects: [String]
    }],
    therapy: [{
      therapyType: String, // فيزياء علاجية، تنفسية، إلخ
      frequency: String,
      duration: String
    }],
    followUpSchedule: [{
      visitType: String,
      scheduledDate: Date,
      completed: Boolean,
      notes: String
    }],
    doctor: String,
    notes: String
  }],
  
  // ملاحظات الطبيب - Doctor's Notes
  doctorNotes: [{
    date: Date,
    doctor: String,
    note: String,
    attachments: [String]
  }],
  
  // الفواتير - Invoices
  invoices: [{
    invoiceId: String,
    date: Date,
    amount: Number,
    status: {
      type: String,
      enum: ['مدفوع', 'قيد الانتظار', 'paid', 'pending']
    },
    items: [{
      service: String,
      cost: Number,
      quantity: Number
    }]
  }],
  
  // آخر زيارة - Last Visit
  lastVisit: Date,
  nextScheduledVisit: Date,
  
  // حالة المريض الحالية - Current Status
  status: {
    type: String,
    enum: ['نشط', 'غير نشط', 'محجوز', 'active', 'inactive', 'admitted'],
    default: 'active'
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
