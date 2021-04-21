import { ReduxActionTypes } from "constants/ReduxActionConstants";
import { LogActionPayload } from "entities/AppsmithConsole";

export const debuggerLogInit = (payload: LogActionPayload) => ({
  type: ReduxActionTypes.DEBUGGER_LOG_INIT,
  payload,
});

export const debuggerLog = (payload: LogActionPayload) => ({
  type: ReduxActionTypes.DEBUGGER_LOG,
  payload,
});

export const clearLogs = () => ({
  type: ReduxActionTypes.CLEAR_DEBUGGER_LOGS,
});

export const showDebugger = (payload: boolean) => ({
  type: ReduxActionTypes.SHOW_DEBUGGER,
  payload,
});

export const errorLog = (payload: LogActionPayload) => ({
  type: ReduxActionTypes.DEBUGGER_ERROR_LOG,
  payload,
});

export const updateErrorLog = (payload: LogActionPayload) => ({
  type: ReduxActionTypes.DEBUGGER_UPDATE_ERROR_LOG,
  payload,
});
