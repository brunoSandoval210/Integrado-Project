export interface ScheduleFilters {
    page: number;
    size: number;
    today?: string;
    filterDay?: string;
    idUser?: number;
    status?: number;
    statusSchedule?: string;
  }

export interface ScheduleFilter {
    today?: string;
    filterDay?: string;
    idUser?: number;
    status?: number;
    statusSchedule?: string;
  }