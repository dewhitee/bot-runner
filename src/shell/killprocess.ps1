$ProcessPID = (get-wmiobject win32_process | where {$_.name -eq 'BotRunnerBotProcess'}).processID
Stop-Process $ProcessPID -Force