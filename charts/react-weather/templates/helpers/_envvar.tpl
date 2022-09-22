{{- define "benlewsey27.backend-env-vars" -}}
{{- range $envVarName, $envVarValue := .Values.backend.env }}
{{- if typeIs "string" $envVarValue }}
- name: {{ $envVarName | quote }}
  value: {{ tpl $envVarValue $ | quote }}
{{- else if typeIs "map[string]interface {}" $envVarValue }}
- name: {{ $envVarName | quote }}
{{- tpl ( toYaml $envVarValue ) $ | nindent 2 }}
{{- end -}}
{{- end -}}
{{- end -}}

{{- define "benlewsey27.frontend-env-vars" -}}
{{- range $envVarName, $envVarValue := .Values.frontend.env }}
{{- if typeIs "string" $envVarValue }}
- name: {{ $envVarName | quote }}
  value: {{ tpl $envVarValue $ | quote }}
{{- else if typeIs "map[string]interface {}" $envVarValue }}
- name: {{ $envVarName | quote }}
{{- tpl ( toYaml $envVarValue ) $ | nindent 2 }}
{{- end -}}
{{- end -}}
{{- end -}}