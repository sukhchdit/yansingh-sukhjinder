
import { BaseAddress } from '../baseaddress.model';

export class StudySubjectVisitSummary extends BaseAddress {
    constructor() {
        super();
    }
    SubjectId: number;
    CoordinatorName: string;
}