import { fork } from 'child_process'
import uuid from 'uuid'

export const ChildProcessStatus = {
  UNINITIALIZED: 0,
  ACTIVE: 1,
  PENDING: 2,
  DELETED: 3
}

class ChildProcess {
  constructor (fullFilePath) {
    this.fullFilePath = fullFilePath
    this.process = undefined
    this.status = ChildProcessStatus.UNINITIALIZED
    this.pid = undefined
    this.uuid = uuid.v4()
  }

  kill () {
    if (this.process) {
      this.process.kill()
      this.status = ChildProcessStatus.DELETED
    }
  }

  active () {
    this.process = fork(this.fullFilePath)
    this.pid = this.process.pid
    this.status = ChildProcessStatus.ACTIVE
  }

  pending () {
    this.status = ChildProcessStatus.PENDING
  }
}

/**
 * Child process manager
 */
export default class ChildProcessManager {
  constructor (maxCount = 2, timeout = undefined) {
    // this.filePath = fullFilePath
    this.MAX_COUNT = maxCount
    this.pendingTasksList = []
    this.processTimeout = timeout
    this.childProcessList = {}
  }

  /**
   * kill a child process if this process active
   * @param uuid {string} uuid of child process
   */
  killChild (uuid) {
    this.childProcessList[uuid].kill()
    delete this.childProcessList[uuid]
    if (this.pendingTasksList.length) {
      const taskUUID = this.pendingTasksList.shift()
      const child = this.childProcessList[taskUUID]
      child.active() // active a child process
    }
  }

  /**
   * Create child process
   * @param fullFilePath {string} path to script exe in child process
   * @returns {ChildProcess}
   */
  createChildProcess (fullFilePath) {
    const child = ChildProcess(fullFilePath)
    this.childProcessList[child.uuid] = child
    // if the total child processes has not reachable the limit
    if (this.childProcessList.length < this.MAX_COUNT) {
      // active a child process
      child.active()
    } else {
      child.pending()
      // push to the pending task list so as to call when a child is free
      this.pendingTasksList.push(child.uuid)
    }
    return child
  }

  /**
   * Kill all child process and pending task
   */
  killAll () {
    this.pendingTasksList = []
    this.childProcessList.forEach(child => {
      child.kill()
    })
  }
}

