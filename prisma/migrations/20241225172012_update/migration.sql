-- AddForeignKey
ALTER TABLE "projectTechnologies" ADD CONSTRAINT "projectTechnologies_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectTechnologies" ADD CONSTRAINT "projectTechnologies_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
